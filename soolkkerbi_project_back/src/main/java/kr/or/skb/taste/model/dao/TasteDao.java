package kr.or.skb.taste.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;

@Mapper
public interface TasteDao {

	int totalCount();

	List selectPartyList(PageInfo pi);
	

}
