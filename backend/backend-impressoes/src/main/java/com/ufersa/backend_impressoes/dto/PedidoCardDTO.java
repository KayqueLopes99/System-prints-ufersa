package com.ufersa.backend_impressoes.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.ufersa.backend_impressoes.model.Pedido;
import com.ufersa.backend_impressoes.model.ItemPedido;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoCardDTO {
    private int idPedido;
    private LocalDateTime dataHora;
    private String nomeArquivoOriginal;
    private String statusFila;
    private Integer totalPaginasArquivo;
    private Double valorTotal;
    
    // Essa string vai mandar formatado: "A4 • P&B • Frente e Verso" para facilitar no React
    private String detalhesImpressao; 

    // Construtor inteligente que converte a Entidade no DTO automaticamente
    public PedidoCardDTO(Pedido pedido) {
        this.idPedido = pedido.getIdPedido();
        this.dataHora = pedido.getDataHora();
        this.nomeArquivoOriginal = pedido.getNomeArquivoOriginal();
        this.statusFila = pedido.getStatusFila().name();
        this.totalPaginasArquivo = pedido.getTotalPaginasArquivo();
        this.valorTotal = pedido.getValorTotal();

        // Pega o primeiro item do pedido e monta a tag (considerando que na maioria das vezes é 1 arquivo por pedido)
        if (pedido.getItens() != null && !pedido.getItens().isEmpty()) {
            ItemPedido item = pedido.getItens().get(0);
            
            String cor = (item.getTipoCor() != null && item.getTipoCor().name().equals("PRETO_BRANCO")) ? "P&B" : "Colorido";
            String frenteVerso = (item.getFrenteVerso() != null && item.getFrenteVerso()) ? "Frente e Verso" : "Apenas Frente";
            
            this.detalhesImpressao = item.getTamanhoPapel() + " • " + cor + " • " + frenteVerso;
        } else {
            this.detalhesImpressao = "Configurações não informadas";
        }
    }
}