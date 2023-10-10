package kr.or.skb.qna.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.notice.model.vo.Notice;
import kr.or.skb.qna.model.vo.Answer;
import kr.or.skb.qna.model.vo.Qna;

@Mapper
public interface QnaDao {

	//전체 게시물 수
	int totalCount();
	
	//페이지 네비게이션 및 게시물 개수 조회
	List selectQnaList(PageInfo pi);
	
	//게시글 작성
	int insertQna(Qna q);
	
	//게시글 상세보기
	Qna selectOneQna(int qnaNo);
	
	//게시글 삭제
	int deleteQna(int qnaNo);
	
	//게시물 수정 - board테이블 변경
	int updateQna(Qna q);

	//댓글 작성
	int registAnswer(Answer a);
	//댓글 작성 후 가장 최근의 댓글을 조회
	Answer printRecentAnswer(int answerNo);
	
	//작성한 댓글 조회
	List<Answer> registPrintAnswer(int answerQnaNo);	
	
	//댓글 출력
	List printAnswer(int answerQnaNo);

	//댓글 삭제
	int deleteAnswer(int answerNo);

	//댓글 수정
	int modifyAnswer(Answer a);

	

}
