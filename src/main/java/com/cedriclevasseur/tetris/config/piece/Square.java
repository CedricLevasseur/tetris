/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cedriclevasseur.tetris.config.piece;

import com.cedriclevasseur.tetris.config.*;
import java.util.ArrayList;
import jdk.nashorn.internal.objects.annotations.Getter;

/**
 *
 * @author cedric
 */
public class Square extends Piece{
    
    

    
    Square(){
        line1.add(true);line1.add(true);
        line2.add(true);line2.add(true);
        
        piece.add(line1);
        piece.add(line2);
        
        height=2;
        width=2;
    }
    
}
