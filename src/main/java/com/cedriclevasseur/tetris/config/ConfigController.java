package com.cedriclevasseur.tetris.config;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author cedric
 */

@RestController
public class ConfigController {
    
    
    @RequestMapping("/config")
    public Config config() {
        return new Config();
    }
}
