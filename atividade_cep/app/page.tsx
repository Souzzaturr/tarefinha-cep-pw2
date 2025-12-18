"use client";

import pesquisaCep from "../utils/api_cep";

import { useState } from "react";

const valor_padrao_formulario = {
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: ""
}

export default function Home() {
  const [ formValores, setFormValores ] = useState(valor_padrao_formulario);
  const [ cepTahCorreto, setCepTahCorreto ] = useState(true);

  const atualizaForm = (event: any) => {
    const { name, value } = event.target;

    setFormValores({...formValores, [ name ]: value})
  }

  const limparForm = () => {
    setFormValores(valor_padrao_formulario);
  }

  const verificaCep = (event: any) => {
    const value = event.target.value;

    setTimeout(() => {
      value.length == 8 || value.length == 0 ? setCepTahCorreto(true) : setCepTahCorreto(false);
      
      value.length == 8 ? autoCompletaForm(value) : undefined;
    }, 1000)

  }

  const autoCompletaForm = async (cep: string) => {
    const dados_cep = await pesquisaCep(cep);

    if (dados_cep.erro)  {
      setCepTahCorreto(false);
      setFormValores({...valor_padrao_formulario, cep: cep})
    } else {
      setFormValores({cep: cep, rua: dados_cep.logradouro, numero: "", bairro: dados_cep.bairro, cidade: dados_cep.localidade, estado: dados_cep.estado});
    }
  }

  return <>
    <h1>Address</h1>

    <form action="" id = "formulario">
      <input type="number" name="cep" id="cep" className = { cepTahCorreto ? "" : "cep-incorreto"} placeholder = "CEP" value = { formValores.cep } onChange = {(e) => { atualizaForm(e); verificaCep(e)}} onFocus = {() => setCepTahCorreto(true) }/>
      { cepTahCorreto ? <></> : <p className = "menssagem-cep-incorreto">CEP inserido está incorreto!</p>}

      <input type="text" name="rua" id="rua" placeholder = "Rua" value = { formValores.rua } onChange = { atualizaForm }/>

      <input type="number" name="numero" id="numero" placeholder = "Número" value = { formValores.numero } onChange = { atualizaForm }/>

      <input type="text" name="bairro" id="bairro" placeholder = "Bairro" value = { formValores.bairro } onChange = { atualizaForm }/>

      <input type="text" name="cidade" id="cidade" placeholder = "Cidade" value = { formValores.cidade } onChange = { atualizaForm }/>

      <input type="text" name="estado" id="estado" placeholder = "Estado" value = { formValores.estado } onChange = { atualizaForm }/>

      <button type="reset" id = "botao-resetar" onClick = {() => { limparForm(); setCepTahCorreto(true) }}>Limpar</button>
    </form>
  </>
}
