import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface Language {
  _id: string
  name: string
}

export const languageService = {
  getLanguages: (): Promise<AxiosResponse<Language[]>> =>
    Promise.resolve({
      data: [
        { _id: '1', name: 'English' },
        { _id: '2', name: 'Ukrainian' },
        { _id: '3', name: 'German' },
        { _id: '4', name: 'French' },
        { _id: '5', name: 'Spanish' },
        { _id: '6', name: 'Polish' }
      ],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as InternalAxiosRequestConfig
    })
}
