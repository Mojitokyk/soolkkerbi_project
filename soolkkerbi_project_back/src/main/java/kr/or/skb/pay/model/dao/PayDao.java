package kr.or.skb.pay.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.cart.model.vo.Cart;
import kr.or.skb.pay.model.vo.Pay;
import kr.or.skb.pay.model.vo.PayListData;
import kr.or.skb.pay.model.vo.SelectDate;

@Mapper
public interface PayDao {

	int totalCount();

	List selectAllCancelPay(PageInfo pi);

	int updatePayStatus(Pay pay);

	List selectAllSuccessPay(PageInfo pi);

	int totalCount2();

	int confirmIncome(Pay pay);

	int totalCount3(String memberId);

	List selectMyOrderList(PayListData pld);

	int insertOnePay(Cart cart);

	int updateProductStock(Cart cart);

	int deleteCart(Cart cart);

	List selectAllIncome(SelectDate selectDate);

	int cancelPay(int payNo);

}
