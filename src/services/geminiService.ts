import { GoogleGenerativeAI } from '@google/generative-ai'

export interface GeminiResponse {
  titles: {
    short: string
    clickbait: string
    seo: string
  }
  tags: string[]
}

export class GeminiService {
  private genAI: GoogleGenerativeAI

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  async optimizeSEO(title: string, description: string, customSlangs: string[], targetNiche: string): Promise<GeminiResponse> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })

    const systemPrompt = `Você é um estrategista de marketing digital brasileiro especialista em YouTube. Foque no que engaja no Brasil: gírias atuais, referências culturais locais e gatilhos mentais de curiosidade/polêmica saudável. Ignore métricas genéricas.

Gírias customizadas do usuário: ${customSlangs.join(', ')}
Nicho alvo: ${targetNiche}

Para o título "${title}" e descrição "${description}", gere:
- 3 opções de título: Curto (até 60 chars), Clickbait (atraente), SEO (otimizado para busca)
- 15 tags de cauda longa relevantes para o Brasil

Retorne apenas em formato JSON: {"titles": {"short": "...", "clickbait": "...", "seo": "..."}, "tags": ["tag1", "tag2", ...]}`

    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch (error) {
      throw new Error('Erro ao parsear resposta do Gemini')
    }
  }
}