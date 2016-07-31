package com.cedriclevasseur.tetris.config.color;

import lombok.Data;

/**
 *
 * @author cedric
 */
public @Data class Grey implements Color {

    String colorMain = "#AAAAAA";
    String colorLight = "#000000";
    String colorDark = "#CCCCCC";
}
