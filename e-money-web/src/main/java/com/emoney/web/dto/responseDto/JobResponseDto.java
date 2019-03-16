package com.emoney.web.dto.responseDto;

import com.emoney.core.model.ResponseDtoBase;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class JobResponseDto extends ResponseDtoBase {
    private String jobTitle;
    private String description;
    private Integer noOfPeople;
    private Date dueDate;
    private Date postedDate;
    private Integer credits;
    private String address1;
    private String address2;
    private String postCode;
    private String phoneNumber;

}
