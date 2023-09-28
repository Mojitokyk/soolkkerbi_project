package kr.or.skb.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;

@Mapper
public interface ProductDao {

	int totalCount();

	List selectAllProduct(PageInfo pi);
	
}
