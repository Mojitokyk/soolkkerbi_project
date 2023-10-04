package kr.or.skb.notice.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.member.model.vo.Member;
import kr.or.skb.member.model.dao.MemberDao;
import kr.or.skb.notice.model.vo.Notice;
import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.notice.model.dao.NoticeDao;
import kr.or.skb.notice.model.vo.Notice;
import kr.or.skb.notice.model.vo.NoticeFile;

@Service
public class NoticeService {
	@Autowired
	private NoticeDao noticeDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private MemberDao memberDao;
	
	//게시물 조회
	public Map noticeList(int reqPage) {
		//게시물 조회, 페이징에 필요한 데이터를 취합
		int numPerPage = 10; //한 페이지당 게시물 수
		int pageNaviSize = 5; //페이지 네비게이션에 표시되는 개수(길이)
		int totalCount = noticeDao.totalCount(); //전체 게시물 수
		
		//페이징 조회 및 페이지네비 제작에 필요한 데이터를 객체로 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		List noticeList = noticeDao.selectNoticeList(pi); //pi로 start, end값을 mybatis로 넘김
		
		//pi와 boardList를 반환해야하나, 1개만 	반환할 수 있다.
		//방법1. VO 제작
		//방법2. Map(HashMap) 사용
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("noticeList", noticeList);
		map.put("pi", pi);
		
		return map;
	}
	
	//게시글 작성
	@Transactional
	public int insertNotice(Notice n, ArrayList<NoticeFile> fileList) {
		System.out.println(n);
		System.out.println(fileList);
		
		//Board테이블에 insert하기 위해서는 회원번호를 알아야한다.
		//작성자 정보를 현재 아이디만 알고있다. -> Board테이블에는 회원번호가 외래키로 설정되어있다.
		//아이디를 이용하여 회원번호를 구해온다(회원정보를 조회하여 회원 정보 중 회원번호를 사용한다)

//		Member member = memberDao.selectOneMember(n.getMemberId());
//		System.out.println("memberNo: "+member.getMemberNo());
//		n.setNoticeMemberNo(member.getMemberNo());
//		System.out.println("noticeMemberNo: "+n.getNoticeMemberNo());
		System.out.println("noticeNo: "+n.getNoticeNo());
		int result = noticeDao.insertNotice(n);
		for(NoticeFile noticeFile : fileList) {
			noticeFile.setNoticeNo(n.getNoticeNo()); //board-mapper의 <selectKey>에서 구해진 boardNo를 삽입
			
			result += noticeDao.insertNoticeFile(noticeFile);
			System.out.println("result "+result);
		}
		if(result == 1 + fileList.size()) {
			return result;
		}else {
			return 0;
		}
	}
	
	//게시글 상세보기
	public Notice selectOneNotice(int noticeNo) {
		Notice n = noticeDao.selectOneNotice(noticeNo);
//		List fileList = noticeDao.selectOneNoticeFile(noticeNo);
//		n.setFileList(fileList);
		return n;
	}
	//게시글 파일 다운로드
	public NoticeFile getNoticeFile(int noticeFileNo) {
		// TODO Auto-generated method stub
		return noticeDao.getNoticeFile(noticeFileNo);
	}
	
	//게시글 삭제
	@Transactional
	public List<NoticeFile> delete(int noticeNo) {
		//1. 게시글 조회
		List<NoticeFile> list = noticeDao.selectNoticeFileList(noticeNo);
		//2. 게시글 삭제
		int result = noticeDao.deleteNotice(noticeNo);
		if(result > 0) {
			return list;
		}
		return null;
	}

}
