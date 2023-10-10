package kr.or.skb.pay.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.pay.model.vo.Pay;
import kr.or.skb.pay.model.vo.PayListData;

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

	List selectAllIncome();

}
