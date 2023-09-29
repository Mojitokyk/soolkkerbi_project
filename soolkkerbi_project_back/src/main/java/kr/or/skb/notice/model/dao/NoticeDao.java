package kr.or.skb.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import kr.or.skb.PageInfo;
import kr.or.skb.notice.model.vo.Notice;
import kr.or.skb.notice.model.vo.NoticeFile;

@Mapper
public interface NoticeDao {
	
	//전체 게시물 수
	int totalCount();
	
	//페이지 네비게이션 및 게시물 개수 조회
	List selectNoticeList(PageInfo pi);
	
	//게시글 작성
	int insertNotice(Notice n);
	
	//게시글 작성 파일 업로드
	int insertNoticeFile(NoticeFile noticeFile);
	
	//게시글 상세보기
	Notice selectOneNotice(int NoticeNo);
	
	//게시글 상세보기 - 파일
	List selectOneNoticeFile(int noticeNo);
	
	//게시글 파일 다운로드
	NoticeFile getNoticeFile(int noticeFileNo);
}
