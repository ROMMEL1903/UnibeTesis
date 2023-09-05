import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PayPhoneService {
  private apiUrl = 'https://pay.payphonetodoesposible.com/api';
  private prueba = 'https://pay.payphonetodoesposible.com/api/sale'
private token='LRygxy4PMFlRFJZAHaElgNnNSoY-03O_wRd8B0oy2sbvcYei5ICATfHLWCWD3T8uAFp4DEwG6uy43gDR99c2T4kmLrIBGSfi_9nW_HMmERuRdxGZBLGYTfe9lhg9CMlJnl5Na_n-RG5aC6JTbR8TACIC8z9jryLly4t3_tRidTo00dae0kxNnyivE2zktYViCmmDy1ST8TPFqnwzeeZyzn1PQGHK96FbuHzsRiUqoV7yVwA8KVQlHAMAgqsQKEYbg6kWfxDkPDGkG1xhrV3XO4abhvJ-PAIKGhQ8zxOiqT_EcoIo2tE8Hn9Y94yrMVtp-p9ISDKq7vbafUIakaDXxrZTgPk'
  constructor() { }

  async createSale(paymentData: any): Promise<any> {
    const url = `${this.prueba}`;
    const headers = {
      Authorization: `Bearer${this.token}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post(url, paymentData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error making payment:', error);
      throw error;
    }
  }

  async getTransactionStatus(transactionId: number): Promise<any> {
    const url = `${this.apiUrl}/sale?transactionId=${transactionId}`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error('Error getting transaction status:', error);
      throw error;
    }
  }
}