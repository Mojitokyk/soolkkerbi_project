package kr.or.skb.cart.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.cart.model.dao.CartDao;
import kr.or.skb.cart.model.vo.Cart;
import kr.or.skb.member.model.dao.MemberDao;
import kr.or.skb.member.model.vo.Member;

@Service
public class CartService {
	@Autowired
	private CartDao cartDao;
	@Autowired
	private MemberDao memberDao;
	
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
		Member member = memberDao.selectOneMember(cart.getMemberId());
		HashMap<String, Object> map = new HashMap <String, Object>();
		map.put("cartList", cartList);
		map.put("totalCount", totalCount);
		map.put("member", member);
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
	
	@Transactional
	public int plusCart(int cartNo) {
		return cartDao.plusCart(cartNo);
	}

	public int removeCart(int cartNo) {
		return cartDao.removeCart(cartNo);
	}

}
