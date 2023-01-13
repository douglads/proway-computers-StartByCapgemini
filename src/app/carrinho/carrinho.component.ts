import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit{
  itensCarrinho : IProdutoCarrinho [] = [];
  total : number = 0;
  constructor(
    public carrinhoService : CarrinhoService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calcularTotal();
  }

  calcularTotal(){
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (Number(curr.quantidade) * curr.preco), 0);
  }

  removeProdutoCarrinho(produtoId : number){
    this.itensCarrinho =  this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoDoCarrinho(produtoId);
    this.calcularTotal();
  }

  comprar(){
    alert("Obrigado por finalizar a compra, volte sempre!");
    this.carrinhoService.limparCarrinho();
    this.router.navigate([""]);
  }
}