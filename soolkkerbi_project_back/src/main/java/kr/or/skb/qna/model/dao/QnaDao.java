package kr.or.skb.qna.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.qna.model.vo.Qna;

@Mapper
public interface QnaDao {

	//전체 게시물 수
	int totalCount();
	
	//페이지 네비게이션 및 게시물 개수 조회
	List selectQnaList(PageInfo pi);
	
	
	//게시글 상세보기
	Qna selectOneQna(int qnaNo);
	
}
