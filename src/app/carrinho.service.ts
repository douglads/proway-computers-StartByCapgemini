import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { NotificacaoService } from './notificacao.service';
import { IProdutoCarrinho } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itens: IProdutoCarrinho[] = [];
  quantidadeCarrinho : Number = 0 ;
  constructor(private notificacao : NotificacaoService) { }

  obtemCarrinho() {
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho) {
    const jaEstaNoCarrinho = this.itens.find(produtoNoCarrinho => produtoNoCarrinho.id === produto.id);
    if (!jaEstaNoCarrinho) {
      this.itens.push(produto);
      localStorage.setItem("carrinho", JSON.stringify(this.itens));
      this.notificacao.notificar("O produto foi adicionado ao carrinho");
    } else {
      this.notificacao.notificar("Este produto já se encontra no carrinho!\nAtualize as quantidades")
    }
  }
  removerProdutoDoCarrinho(produtoId: number) {
    this.itens = this.itens.filter(item => item.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  limparCarrinho() {
    this.itens = [];
    localStorage.clear();
  }
}
