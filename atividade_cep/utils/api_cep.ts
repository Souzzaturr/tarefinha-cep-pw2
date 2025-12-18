export default async function pesquisaCep (cep: string) {
    const saida_api = fetch(`https://viacep.com.br/ws/${ cep }/json`)
                        
    return (await saida_api).json()
}