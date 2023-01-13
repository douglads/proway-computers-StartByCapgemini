import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { NotificacaoService } from '../notificacao.service';
import { IProduto, IProdutoCarrinho } from '../produtos';
import { ProdutosService } from '../produtos.service';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{
  produtos : IProduto[] | undefined;
  quantidade : number = 1;
  constructor(private produtosService : ProdutosService, private notificacao : NotificacaoService, private carrinhoService: CarrinhoService){} 

  ngOnInit(): void {
    this.produtos = this.produtosService.getAll();
  }
  
  adicionarAoCarrinho(produtoId : number){
    const produto = this.produtos?.find(produto => produto.id === produtoId);
    this.notificacao?.notificar("O produto foi adicionado ao carrinho");
    const diretoCarrinho : IProdutoCarrinho = {
      ...produto!,
      quantidade : 1
    }
    console.log(produto?.id);
    
    this.carrinhoService.adicionarAoCarrinho(diretoCarrinho);
  }
}
