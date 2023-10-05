package kr.or.skb.cart.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.cart.model.dao.CartDao;
import kr.or.skb.cart.model.vo.Cart;

@Service
public class CartService {
	@Autowired
	private CartDao cartDao;
	
	@Transactional
	public int addCart(Cart cart) {
		return cartDao.addCart(cart);
	}

	public Cart cartCheck(Cart cart) {
		return cartDao.cartCheck(cart);
		
	}
	
	@Transactional
	public int updateCart(Cart cart) {
		return cartDao.updateCart(cart);
	}

	public Map selectCart(Cart cart) {
		List cartList = cartDao.selectCart(cart);
		Cart totalCount = cartDao.totalCount(cart);
		HashMap<String, Object> map = new HashMap <String, Object>();
		map.put("cartList", cartList);
		map.put("totalCount", totalCount);
		return map;
	}
	
	@Transactional
	public int deleteCart(List<Integer> checkList) {
		int result = 0;
		for(int cartNo : checkList) {
			result += cartDao.deleteCart(cartNo);
		}
		return result;
	}
	
	@Transactional
	public int deleteOneCart(int cartNo) {
		return cartDao.deleteCart(cartNo);
	}

}
