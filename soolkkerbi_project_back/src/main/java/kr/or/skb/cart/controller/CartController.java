package kr.or.skb.cart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.cart.model.service.CartService;

@RestController
@RequestMapping(value="/cart")
public class CartController {
	@Autowired
	private CartService cartService;
}
