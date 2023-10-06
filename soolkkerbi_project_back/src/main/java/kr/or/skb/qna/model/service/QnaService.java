package kr.or.skb.qna.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.notice.model.vo.Notice;
import kr.or.skb.notice.model.vo.NoticeFile;
import kr.or.skb.qna.model.dao.QnaDao;
import kr.or.skb.qna.model.vo.Answer;
import kr.or.skb.qna.model.vo.Qna;

@Service
public class QnaService {
	@Autowired
	private QnaDao qnaDao;
	@Autowired
	private Pagination pagination;
	
	//게시물 조회
	public Map qnaList(int reqPage) {
		//게시물 조회, 페이징에 필요한 데이터를 취합
		int numPerPage = 10; //한 페이지당 게시물 수
		int pageNaviSize = 5; //페이지 네비게이션에 표시되는 개수(길이)
		int totalCount = qnaDao.totalCount(); //전체 게시물 수
		
		//페이징 조회 및 페이지네비 제작에 필요한 데이터를 객체로 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		List qnaList = qnaDao.selectQnaList(pi); //pi로 start, end값을 mybatis로 넘김
		
		//pi와 boardList를 반환해야하나, 1개만 	반환할 수 있다.
		//방법1. VO 제작
		//방법2. Map(HashMap) 사용
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("qnaList", qnaList);
		map.put("pi", pi);
		
		return map;
	}
	
	
	//게시글 작성
	@Transactional
	public int insertQna(Qna q) {
		System.out.println("qnaService: "+q);
		
		//Board테이블에 insert하기 위해서는 회원번호를 알아야한다.
		//작성자 정보를 현재 아이디만 알고있다. -> Board테이블에는 회원번호가 외래키로 설정되어있다.
		//아이디를 이용하여 회원번호를 구해온다(회원정보를 조회하여 회원 정보 중 회원번호를 사용한다)

//		Member member = memberDao.selectOneMember(n.getMemberId());
//		System.out.println("memberNo: "+member.getMemberNo());
//		n.setNoticeMemberNo(member.getMemberNo());
//		System.out.println("noticeMemberNo: "+n.getNoticeMemberNo());
		int result = qnaDao.insertQna(q);
			return result;
	}
	
	//게시글 상세보기
	public Qna selectOneQna(int qnaNo) {
		Qna q = qnaDao.selectOneQna(qnaNo);
		return q;
	}
	
	//게시글 삭제
	@Transactional
	public int delete(int qnaNo) {
		System.out.println("qnaService - qnaNo: "+qnaNo);
		return qnaDao.deleteQna(qnaNo);
	}
	
	//게시물 수정
	@Transactional
	public int modify(Qna q) {
		System.out.println("qnaService: "+q.getQnaNo());
		System.out.println("qnaService: "+q.getQnaTitle());
		System.out.println("qnaService: "+q.getQnaContent());
		return qnaDao.updateQna(q);
	}

	//댓글 작성
	public int registAnswer(Answer a) {
		return qnaDao.registAnswer(a);
	}

	//댓글 출력
	public List selectOneAnswer(int answerQnaNo) {
		return qnaDao.selectOneAnswer(answerQnaNo);
	}
}
