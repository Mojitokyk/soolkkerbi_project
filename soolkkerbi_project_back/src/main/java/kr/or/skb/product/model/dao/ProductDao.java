package kr.or.skb.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.pay.model.vo.Pay;
import kr.or.skb.product.model.vo.Product;
import kr.or.skb.product.model.vo.ProductListData;

@Mapper
public interface ProductDao {

	int totalCount();

	List selectAllProduct(PageInfo pi);

	int updateStock(Product p);

	int insertProduct(Product p);

	List selectTakjuList(ProductListData pld);

	List selectYakjuList(ProductListData pld);

	List selectFruitList(ProductListData pld);

	List selectSpiritsList(ProductListData pld);

	int insertLike(Product p);

	int deleteLike(Product p);

	int updatePayStock(Pay pay);

	Product selectOneProduct(Product p);

	int selectLike(Product p);

	List likeList(String memberId);

	int yakjuTotalCount();

	int takjuTotalCount();

	int fruitTotalCount();

	int spiritTotalCount();

	//메인페이지 추천리스트 조회
	List recommendList();

	int deleteProduct(int productNo);

	int updateProduct(Product p);
	
}
