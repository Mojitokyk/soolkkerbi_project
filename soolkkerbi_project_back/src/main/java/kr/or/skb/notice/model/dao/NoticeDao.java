package kr.or.skb.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.notice.model.vo.Notice;

@Mapper
public interface NoticeDao {
	
	//전체 게시물 수
	int totalCount();
	
	//페이지 네비게이션 및 게시물 개수 조회
	List selectNoticeList(PageInfo pi);
	
	//게시글 작성
	int insertNotice(Notice n);
	
	//게시글 상세보기
	Notice selectOneNotice(int NoticeNo);

	//게시글 삭제
	int deleteNotice(int noticeNo);

	//게시물 수정 - board테이블 변경
	int updateNotice(Notice n);
}
