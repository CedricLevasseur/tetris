package com.cedriclevasseur;

import com.cedriclevasseur.tetris.TetrisApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TetrisApplication.class)
@WebAppConfiguration
public class TetrisApplicationTests {

	@Test
	public void contextLoads() {
	}

}
