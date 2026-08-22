export class PixService {
  private static PIX_KEY = 'iagoplaysson@hotmail.com' // Substitua pela chave Pix real

  static generatePix(value: number): string {
    // Lógica simplificada para BR Code (EMV Co10)
    // Em produção, use uma biblioteca adequada para gerar códigos Pix válidos
    const payload = `00020126360014BR.GOV.BCB.PIX0111${this.PIX_KEY}520400005303986540${value.toFixed(2).replace('.', '')}5802BR5913Nome do Recebedor6009Cidade6014BR62070503***6304`

    // Calcular CRC16 (simplificado, em produção use algoritmo correto)
    const crc = this.calculateCRC(payload)
    return payload + crc
  }

  private static calculateCRC(payload: string): string {
    // Implementação simplificada do CRC16-CCITT
    // Em produção, use uma implementação completa
    let crc = 0xFFFF
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = (crc << 1) ^ 0x1021
        } else {
          crc <<= 1
        }
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0')
  }
}