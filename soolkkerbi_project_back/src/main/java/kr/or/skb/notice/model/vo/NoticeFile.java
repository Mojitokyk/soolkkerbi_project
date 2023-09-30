package kr.or.skb.notice.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="noticeFile")
public class NoticeFile {
    private int noticeFileNo;
    private int noticeNo;
    private String noticeFileName;
    private String noticeFilePath;
}
