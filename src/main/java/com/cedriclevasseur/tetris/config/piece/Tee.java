/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cedriclevasseur.tetris.config.piece;

import com.cedriclevasseur.tetris.config.*;

/**
 *
 * @author cedric
 */
public class Tee extends Piece {
    Tee(){
        line1.add(true);line1.add(true);line1.add(true);
        line2.add(false);line2.add(true);
        piece.add(line1);
        piece.add(line2);
    }
    
}
