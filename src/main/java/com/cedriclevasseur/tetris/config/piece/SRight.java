/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cedriclevasseur.tetris.config.piece;

/**
 *
 * @author cedric
 */
public class SRight extends Piece {


    
    SRight(){
        line1.add(true);line1.add(true);line1.add(false);
        line2.add(false);line2.add(true);line2.add(true);
        piece.add(line1);
        piece.add(line2);
        
        height=2;
        width=3;
    }
    
}
