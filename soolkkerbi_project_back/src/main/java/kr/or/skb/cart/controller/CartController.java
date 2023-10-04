package kr.or.skb.cart.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.cart.model.service.CartService;
import kr.or.skb.cart.model.vo.Cart;
import kr.or.skb.product.model.vo.Product;

@RestController
@RequestMapping(value="/cart")
public class CartController {
	@Autowired
	private CartService cartService;
	
	//상품리스트 -> 장바구니 담기
	@PostMapping(value="/addCart")
	public int addCart(@RequestBody Cart cart, @RequestAttribute String memberId) {
		cart.setMemberId(memberId);
		Cart c = cartService.cartCheck(cart);
		if(c == null) {
			return cartService.addCart(cart);
		}else {
			return cartService.updateCart(cart);
		}
	}
	
	//장바구니 조회
	@PostMapping(value="/selectCart")
	public Map selectCart(@RequestAttribute String memberId) {
		Cart cart = new Cart();
		cart.setMemberId(memberId);
		Map map = cartService.selectCart(cart);
		return map;
	}
}
