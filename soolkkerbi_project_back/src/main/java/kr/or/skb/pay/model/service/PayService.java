package kr.or.skb.pay.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.SelectDate;
import kr.or.skb.cart.model.vo.Cart;
import kr.or.skb.pay.model.dao.PayDao;
import kr.or.skb.pay.model.vo.Pay;
import kr.or.skb.pay.model.vo.PayListData;
import kr.or.skb.product.model.dao.ProductDao;

@Service
public class PayService {
	@Autowired
	private PayDao payDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private ProductDao productDao;
	
	public Map readAllCancelPay(int reqPage) {
		int totalCount = payDao.totalCount();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List payList = payDao.selectAllCancelPay(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", payList);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int updatePayStatus(Pay pay) {
		int result1 = payDao.updatePayStatus(pay);
		int result2 = productDao.updatePayStock(pay);
		int result = result1 + result2;
		return result;
	}

	public Map readAllSuccessPay(int reqPage) {
		int totalCount = payDao.totalCount2();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List payList = payDao.selectAllSuccessPay(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", payList);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int confirmIncome(Pay pay) {
		return payDao.confirmIncome(pay);
	}

	//마이페이지 주문내역 전부 조회하기
	public Map readOrderList(int reqPage, String memberId) {
		int totalCount = payDao.totalCount3(memberId);
		System.out.println("totalCount : " + totalCount);
		int numPerPage = 5;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		PayListData pld = new PayListData(start, end, memberId);
		List orderList = payDao.selectMyOrderList(pld);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list",orderList);
		map.put("pi", pi);
		return map;
	}

	public List readAllIncome(SelectDate selectDate) {
		String startDate = selectDate.getStart();
		
		
		int caseOneTotal = payDao.caseOneTotal(selectDate);
		int caseTwoTotal = payDao.caseTwoTotal(selectDate);
		int caseThreeTotal = payDao.caseThreeTotal(selectDate);
		int caseFourTotal = payDao.caseFourTotal(selectDate);		
		HashMap<String, Object> income1 = new HashMap<String, Object>();
		income1.put("payDate", startDate);
		income1.put("탁주", caseOneTotal);
		income1.put("약주/청주", caseTwoTotal);
		income1.put("증류주", caseThreeTotal);
		income1.put("과실주", caseFourTotal);
				
		int caseOneTotal2 = payDao.caseOneTotal2(selectDate);
		int caseTwoTotal2 = payDao.caseTwoTotal2(selectDate);
		int caseThreeTotal2 = payDao.caseThreeTotal2(selectDate);
		int caseFourTotal2 = payDao.caseFourTotal2(selectDate);
		HashMap<String, Object> income2 = new HashMap<String, Object>();
		income2.put("payDate", "2023-10-05");
		income2.put("탁주", caseOneTotal2);
		income2.put("약주/청주", caseTwoTotal2);
		income2.put("증류주", caseThreeTotal2);
		income2.put("과실주", caseFourTotal2);
		
		ArrayList<Object> list = new ArrayList<Object>();
		list.add(income1);
		list.add(income2);

		return list;
	}
	
	@Transactional
	public int insertOnePay(Cart cart) {
		int result = 0;
		result += payDao.insertOnePay(cart);
		result += payDao.updateProductStock(cart);
		result += payDao.deleteCart(cart);
		return 1;
		/* 장바구니에 안 담고 바로 구매 가능
		if(result == 3) {
			return 1;
		}else {
			return 0;			
		}
		*/
	}
	@Transactional
	public int insertPayList(List<Cart> cartList, String memberId) {
		int result = 0;
		for(Cart cart : cartList) {
			cart.setMemberId(memberId);
			result += payDao.insertOnePay(cart);
			result += payDao.updateProductStock(cart);
			result += payDao.deleteCart(cart);
		}
		return 1;
		/* 장바구니에 안 담고 바로 구매 가능
		if(result == cartList.size()*3) {
			return 1;
		}else {
			return 0;			
		}
		*/
	}
}
