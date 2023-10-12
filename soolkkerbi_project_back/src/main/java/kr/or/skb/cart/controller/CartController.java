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
	public int addCart(@RequestBody Cart cart, @RequestAttribute(required=false) String memberId) {
		cart.setMemberId(memberId);
		//장바구니 중복 품목 조회
		Cart c = cartService.cartCheck(cart);
		//장바구니 중복 없는 경우 -> insert
		if(c == null) {
			return cartService.addCart(cart);
		//장바구니 중복 있는 경우 -> update
		}else {
			return cartService.updateCart(cart);
		}
	}
	
	//1.장바구니 리스트 조회 2.장바구니 내 합계 금액, 품목 개수 조회
	@PostMapping(value="/selectCart")
	public Map selectCart(@RequestAttribute(required=false) String memberId) {
		Cart cart = new Cart();
		cart.setMemberId(memberId);
		Map map = cartService.selectCart(cart);
		return map;
	}
	
	//선택한 상품 장바구니 삭제
	@PostMapping(value="/deleteCart")
	public Map deleteCart(@RequestBody List<Integer> checkList, @RequestAttribute(required=false) String memberId) {
		Cart cart = new Cart();
		cart.setMemberId(memberId);
		int result = cartService.deleteCart(checkList);
		Map map = cartService.selectCart(cart);
		return map;
	}
	
	//개별 상품 장바구니 삭제
	@PostMapping(value="/deleteOneCart")
	public Map deleteOneCart(@RequestBody Cart cart, @RequestAttribute(required=false) String memberId) {
		cart.setMemberId(memberId);
		int result = cartService.deleteOneCart(cart.getCartNo());
		Map map = cartService.selectCart(cart);
		return map;
	}
	
	//장바구니 수량 +1 업데이트
	@PostMapping(value="/plusCart")
	public Map plusCart(@RequestBody Cart cart, @RequestAttribute(required=false) String memberId) {
		cart.setMemberId(memberId);
		int result = cartService.plusCart(cart.getCartNo());
		Map map = cartService.selectCart(cart);
		return map;
	}
	
	//장바구니 수량 -1 업데이트
	@PostMapping(value="/removeCart")
	public Map removeCart(@RequestBody Cart cart, @RequestAttribute(required=false) String memberId) {
		cart.setMemberId(memberId);
		int result = cartService.removeCart(cart.getCartNo());
		Map map = cartService.selectCart(cart);
		return map;
	}
	
	//상세페이지 -> 장바구니 담기
	@PostMapping(value="/addFromDetail")
	public int addFromDetail(@RequestBody Cart cart, @RequestAttribute(required = false) String memberId) {
		cart.setMemberId(memberId);
		//장바구니 품목조회
		Cart c = cartService.cartCheck(cart);
		//장바구니에 중복된 품목이 없는 경우
		if(c == null) {
			return cartService.insertCart(cart);
		}else { //중복인 경우 -> update
			return cartService.updateCart(cart);
		}
	}
}
