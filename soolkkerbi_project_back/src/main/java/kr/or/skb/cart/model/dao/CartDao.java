package kr.or.skb.cart.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.cart.model.vo.Cart;

@Mapper
public interface CartDao {

	int addCart(Cart cart);

	Cart selectCart(Cart cart);

	int updateCart(Cart cart);

}
