package kr.or.skb.cart.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.cart.model.vo.Cart;

@Mapper
public interface CartDao {

	int addCart(Cart cart);

	Cart cartCheck(Cart cart);

	int updateCart(Cart cart);

	List selectCart(Cart cart);

	Cart totalCount(Cart cart);

	int deleteCart(int cartNo);

	int plusCart(int cartNo);

	int removeCart(int cartNo);

	int insertCart(Cart cart);

}
