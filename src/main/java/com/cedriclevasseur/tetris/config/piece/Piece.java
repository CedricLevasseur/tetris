/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cedriclevasseur.tetris.config.piece;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author cedric
 */
public class Piece {
    
    ArrayList<ArrayList>piece = new ArrayList();
    
    ArrayList<Boolean> line1=new ArrayList<>();
    ArrayList<Boolean> line2=new ArrayList<>();
    ArrayList<Boolean> line3=new ArrayList<>();
    
    
    
    public static List<Piece> getListOfPiece(){
        List listOfPiece= new ArrayList<Piece>();
        listOfPiece.add(new Square());
        listOfPiece.add(new Bar());
        listOfPiece.add(new Tee());
        listOfPiece.add(new LLeft());
        listOfPiece.add(new LRight());
        listOfPiece.add(new SLeft());
        listOfPiece.add(new SRight());
        return listOfPiece;
    }   
    
    Piece(){
    }
    
    @Override
    public String toString(){
    String toReturn = new String();    
        for(ArrayList<Boolean> line : piece){
            for(Boolean pixel : line){
                if(pixel){
                    toReturn+="*";
                }else{
                    toReturn+=" ";
                }
            }
            toReturn+="\n";
        }
    return toReturn;
    }
 
    public String getMe(){
        return toString();
    }
    
    public String getName(){
        return this.getClass().getSimpleName();
    }
    
}
