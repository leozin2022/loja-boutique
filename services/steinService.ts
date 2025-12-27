
import { Product } from '../types';

const STORAGE_ID = '694f0f9faffba40a622ff95e';
const SHEET_NAME = 'Página1'; 

// Codifica o nome da aba corretamente para a URL
const ENCODED_SHEET = encodeURIComponent(SHEET_NAME);
const STEIN_BASE_URL = `https://api.steinhq.com/v1/storages/${STORAGE_ID}/${ENCODED_SHEET}`;

export const steinService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(STEIN_BASE_URL);
      if (!response.ok) throw new Error(`Erro API: ${response.status}`);
      
      const data = await response.json();
      if (!Array.isArray(data)) return [];

      return data.map((item: any) => ({
        ...item,
        // O ID vindo da planilha (Coluna A na sua imagem)
        id: item.id || `temp-${Math.random()}`,
        image: item.image1 || item.image || '', 
        price: Number(item.price) || 0,
        oldPrice: item.oldPrice ? Number(item.oldPrice) : undefined,
        stock: Number(item.stock) || 0,
        isBestSeller: String(item.isBestSeller).toLowerCase() === 'true',
        isNew: String(item.isNew).toLowerCase() === 'true',
        isPromotion: String(item.isPromotion).toLowerCase() === 'true',
      }));
    } catch (error: any) {
      console.error('Falha ao buscar produtos:', error);
      return [];
    }
  },

  async addProduct(product: any): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(STEIN_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([product]),
      });

      const result = await response.json();
      if (!response.ok) return { success: false, error: result.error || 'Erro ao salvar' };
      return { success: true };
    } catch (error: any) {
      return { success: false, error: 'Falha na conexão.' };
    }
  },

  async deleteProduct(id: string): Promise<{ success: boolean; message?: string }> {
    if (!id || id.startsWith('temp-')) {
      return { success: false, message: 'ID inválido ou item não sincronizado.' };
    }

    try {
      console.log('Iniciando exclusão na planilha para o ID:', id);
      
      const response = await fetch(STEIN_BASE_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          condition: { id: id }
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Resposta de erro do SteinHQ:', result);
        return { success: false, message: result.error || 'Erro na API SteinHQ' };
      }

      // SteinHQ retorna a contagem de linhas alteradas
      if (result.clearedRowsCount && result.clearedRowsCount > 0) {
        return { success: true };
      }

      return { 
        success: false, 
        message: 'A planilha não encontrou este ID. Verifique se a coluna na Coluna A está escrita exatamente como "id".' 
      };

    } catch (error) {
      console.error('Erro de rede:', error);
      return { success: false, message: 'Erro de conexão com a planilha.' };
    }
  }
};
