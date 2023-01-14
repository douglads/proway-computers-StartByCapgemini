import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs';
import { CarrinhoService } from '../carrinho.service';
import { NotificacaoService } from '../notificacao.service';
import { IProduto, IProdutoCarrinho } from '../produtos';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{
  produtos : IProduto[] | undefined;
  quantidade : number = 1;
  constructor(private produtosService : ProdutosService, private notificacao : NotificacaoService, private carrinhoService: CarrinhoService, private route : ActivatedRoute){} 

  ngOnInit(): void {
    const produtos = this.produtosService.getAll();

    this.route.queryParamMap.subscribe(params => {
      const descricao = params.get("descricao")?.toLowerCase();

      if (descricao) {
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao));
        return;
      }

      this.produtos = produtos;
    });
  }
  
  adicionarAoCarrinho(produtoId : number){
    const produto = this.produtos?.find(produto => produto.id === produtoId);
    const diretoCarrinho : IProdutoCarrinho = {
      ...produto!,
      quantidade : 1
    }   
      
    this.carrinhoService.adicionarAoCarrinho(diretoCarrinho);
  }
}
