package com.emoney.web.model;

import com.emoney.core.model.EntityBase;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Where(clause = "deleted = false")
@Table(name = "user_rating")
public class UserRatingEntity extends EntityBase {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private JobEntity job;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "poster_id")
    private UserEntity poster;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private UserEntity worker;
    @Column(name = "poster_review")
    private Integer posterReview;
    @Column(name = "worker_review")
    private Integer workerReview = null;
    @Column(name = "poster_comment")
    private String posterComment;
    @Column(name = "worker_comment")
    private String workerComment = null;

}
