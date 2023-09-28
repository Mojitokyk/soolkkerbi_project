package kr.or.skb.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;

@Mapper
public interface NoticeDao {
	
	//전체 게시물 수
	int totalCount();
	
	//페이지 네비게이션 및 게시물 개수 조회
	List selectNoticeList(PageInfo pi);
}
