package kr.or.skb.pay.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.pay.model.vo.Pay;

@Mapper
public interface PayDao {

	int totalCount();

	List selectAllPay(PageInfo pi);

	int updatePayStatus(Pay p);

}
