/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cedriclevasseur.tetris.config;

import com.cedriclevasseur.tetris.config.color.Blue;
import com.cedriclevasseur.tetris.config.color.Color;
import com.cedriclevasseur.tetris.config.color.Green;
import com.cedriclevasseur.tetris.config.color.Grey;
import com.cedriclevasseur.tetris.config.color.Red;
import com.cedriclevasseur.tetris.config.piece.Piece;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author cedric
 */
public @Data class Config {

    private Integer gridHeight=600;   
  
    private Integer gridWidth=400;
    
    private Integer sizeBlock=20;
    
    private List<Color> listOfColor= Color.getListOfColor();
    
    private List<Piece> listOfPiece= Piece.getListOfPiece(); 
    
}
