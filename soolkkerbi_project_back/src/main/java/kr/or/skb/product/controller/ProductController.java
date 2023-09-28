package kr.or.skb.product.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.product.model.service.ProductService;

@RestController
@RequestMapping(value="/product")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@GetMapping(value = "/readAllProduct/{reqPage}")
	public Map readAllProduct(@PathVariable int reqPage) {
		return productService.readAllProduct(reqPage);
	}
}