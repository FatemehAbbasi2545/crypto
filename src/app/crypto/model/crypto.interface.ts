
export interface CryptoCurrency {
    id: string;
    name: string;
    priceUsd: string;
    changePercent24Hr: string;
    explorer: string;
    marketCapUsd: string;
    maxSupply: string;
    rank:string;
    supply: string;
    symbol: string
    volumeUsd24Hr: string;
    vwap24Hr: string;
}

export interface AssetsResponse {
    data: CryptoCurrency[];
    timestamp: number;
}

export interface CurrencyHistory {
    date: string;
    priceUsd: string;
    time: number;
}

export interface AssetHistoryResponse {
    data: CurrencyHistory[];
    timestamp: number;
}