package kr.or.skb.cart.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.skb.cart.model.dao.CartDao;

@Service
public class CartService {
	@Autowired
	private CartDao cartDao;
}
