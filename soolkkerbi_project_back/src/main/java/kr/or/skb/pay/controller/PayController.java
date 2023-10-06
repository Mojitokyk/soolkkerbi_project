package kr.or.skb.pay.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.pay.model.service.PayService;
import kr.or.skb.pay.model.vo.Pay;

@RestController
@RequestMapping(value="/pay")
public class PayController {
	@Autowired
	private PayService payService;
	
	@GetMapping(value="/readAllCancelPay/{reqPage}")
	public Map readAllCancelPay(@PathVariable int reqPage) {
		return payService.readAllCancelPay(reqPage);
	}
	
	@PostMapping(value="/updatePayStatus")
	public int updatePayStatus(@RequestBody Pay pay) {
		return payService.updatePayStatus(pay);
	}
		
	@GetMapping(value="/readAllSuccessPay/{reqPage}")
	public Map readAllSuccessPay(@PathVariable int reqPage) {
		return payService.readAllSuccessPay(reqPage);
	}
	
	@PostMapping(value="/confirmIncome")
	public int confirmIncome(@RequestBody Pay pay) {
		return payService.confirmIncome(pay);
	}
	
	@PostMapping(value="/readAllIncome")
	public List readAllIncome() {
		return null;
	}
	
	//마이페이지 주문내역 조회하기
	@GetMapping(value="/readOrderList/{reqPage}")
	public Map readOrderList(@PathVariable int reqPage, @RequestAttribute String memberId ) {
		//System.out.println(memberId);
		//System.out.println(reqPage);
		return payService.readOrderList(reqPage, memberId);
	}
}
