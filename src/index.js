module.exports = function toReadable(number) {

    class NumberReadable {
        constructor(num) {
            this.dict = {
                tenths: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
                tenthsSpecial: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
                hundredths: ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
                hundred: 'hundred',
                thousand: 'thousand'
            }
            this.num = num;
            this.output = [];
        }
        tenths() {
            if (this.num == 0 || this.num == null) {
                this.output.push(this.dict.tenths[0]);
            }
            if (this.num < 10 && this.num != 0) {
                this.output.push(this.dict.tenths[this.num]);
            }
            if (this.num < 20 && this.num >= 10) {
                this.output.push(this.dict.tenthsSpecial[this.num % 10]);
            }
            if (this.num >= 20 && this.num < 100) {
                this.output.push(this.dict.hundredths[Math.trunc(this.num / 10) - 2]);
                if (this.num % 10 > 0) {
                    this.output.push(this.dict.tenths[this.num % 10]);
                }
            }
        }
        hundred() {
            if (this.num >= 100 && this.num < 1000) {
                this.output.push(this.dict.tenths[Math.trunc(this.num / 100)]);
                this.output.push(this.dict.hundred);
                this.num = this.num % 100;
                if (this.num != 0) {
                    this.tenths();
                }
            }
        }
        thousand() {
            if (this.num >= 1000 && this.num < 10000) {
                this.output.push(this.dict.tenths[Math.trunc(this.num / 1000)]);
                this.output.push(this.dict.thousand);
                this.num = this.num % 1000;
                if (this.num !== 0) {
                    this.hundred();
                }
            }
        }
        convert() {
            return this.output.join(' ');
        }
    }

    let count = Math.pow(10, number.toString().length - 1);
    let num = new NumberReadable(number);

    switch (count) {
        case 1000:
            num.thousand();
            break;
        case 100:
            num.hundred();
            break;
        default:
            num.tenths();
            break;
    }
    return num.convert();
}
