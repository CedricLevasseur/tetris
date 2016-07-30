/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cedriclevasseur.tetris.config;

import com.cedriclevasseur.tetris.config.piece.Bar;
import com.cedriclevasseur.tetris.config.piece.Piece;
import com.cedriclevasseur.tetris.config.piece.Square;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author cedric
 */
public @Data class Config {

    private Integer gridHeight=100;   
  
    private Integer gridWidth=30;
    
    private Integer sizeBlock=20;
    
    private Piece piece = new Bar();
    
    private List<Piece> listOfPiece= Piece.getListOfPiece(); 
    
   
}
