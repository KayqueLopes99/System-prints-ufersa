package com.ufersa.backend_impressoes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstatisticasPedidoDTO {
    private long totalPedidos;
    private long totalPaginas;
    private double totalGasto;
}