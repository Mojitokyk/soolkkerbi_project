package kr.or.skb.cart.model.service;

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

	public Cart selectCart(Cart cart) {
		return cartDao.selectCart(cart);
		
	}
	
	@Transactional
	public int updateCart(Cart cart) {
		return cartDao.updateCart(cart);
	}

}
