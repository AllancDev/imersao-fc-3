package service

import (
	"context"

	"github.com/allancdev/codebank/dto"
	"github.com/allancdev/codebank/infrastructure/grpc/pb"
	"github.com/allancdev/codebank/usecase"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type TransactionService struct {
	ProcessTransactionUseCase usecase.UseCaseTransaction
	pb.UnimplementedPaymentServiceServer
}

func NewTransactionService() *TransactionService {
	return &TransactionService{}
}

func (t *TransactionService) Payment(ctx context.Context, in *pb.PaymentRequest) (*empty.Empty, error) {
	transactionDto := dto.Transaction{
		Name:            in.GetCreditCard().GetName(),
		Number:          in.GetCreditCard().GetNumber(),
		ExpirationMonth: in.CreditCard.GetExpirationMonth(),
		ExpirationYear:  in.CreditCard.GetExpirationYear(),
		CVV:             in.CreditCard.GetCvv(),
		Amount:          in.GetAmount(),
		Store:           in.GetStore(),
		Description:     in.GetDescription(),
	}

	transaction, err := t.ProcessTransactionUseCase.ProcessTransaction(transactionDto)

	if err != nil {
		return &empty.Empty{}, status.Error(codes.FailedPrecondition, err.Error())
	}

	if transaction.Status != "approved" {
		return &empty.Empty{}, status.Error(codes.FailedPrecondition, "transaction rejected by the bank")
	}

	return &empty.Empty{}, nil
}
