declare module '@vercel/blob' {
  export interface PutOptions {
    access?: 'public' | 'private';
    contentType?: string;
  }
  export function put(path: string, data: ArrayBuffer | Buffer | Uint8Array | Blob, options?: PutOptions): Promise<{ url: string }>;
}


